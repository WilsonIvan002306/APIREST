const CONFIG = require('./app/config/configuracion')
const app = require('./app/app')

app.listen(CONFIG.PORT, ()=>{
    console.log(`Aplicacion corriendo en el puerto ${CONFIG.PORT}`)
})

