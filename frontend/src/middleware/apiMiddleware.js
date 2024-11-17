import axios from 'axios';

const apiMiddleware = ({ dispatch }) => next => action => {
  const { method, url, params, headers = {}, types, body, onSuccess, onError, ...rest } = action;

  // Если метод не определен, это не наш специфичный API-запрос, передаем действие дальше
  if (!method) {
    return next(action);
  }

  const [START, SUCCESS, FAIL] = types;

  // Стартуем стартовый action
  dispatch({ type: START });

  const DEFAULT_HEADERS = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  };

  axios({
    method,
    url,
    params,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
    data: body,
  })
    .then(response => {
      dispatch({
        type: SUCCESS,
        response: response.data,
        ...rest,
      });

      if (onSuccess) {
        onSuccess(dispatch, response.data);
      }
    })
    .catch(error => {
      dispatch({
        type: FAIL,
        response: error.message,
      });

      if (onError) {
        onError(dispatch, error);
      }
    });
};

export default apiMiddleware;