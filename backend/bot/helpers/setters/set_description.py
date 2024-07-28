from aiogram import Bot


async def set_description(bot: Bot):
    await bot.set_my_short_description(
        short_description="""
🎂 Тортики Морошка Дудинка
🛟 Поддержка: @roman_danilov
""",
    )

    await bot.set_my_description(
        description="""
🎂 Тортики Морошка Дудинка
""",
    )
