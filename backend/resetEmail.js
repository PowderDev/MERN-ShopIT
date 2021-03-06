
module.exports = function(email, resetUrl){
    return {
                to: email,
                from: process.env.EMAIL_FROM,
                subject: 'Ввостановить пароль',
                html: `
                    <h1>Забыли пароль?</h1>
                    <p>Если нет, то проигнорируйте это письмо</p>
                    <p>Иначе нажмите на ссылку ниже:</p>
                    <a href=${resetUrl}>Сбросить пароль</a>
                    <p>${resetUrl}</p>
                    <hr />
                    <a href=${process.env.SITE_URL}>Магазин курсов</a>
                ` 
            }
}