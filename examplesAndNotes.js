/*
--------------------------------
Ejemplos diversos (pseudocódigo)
--------------------------------

1. Ejemplo de petición a zona privada
-------------------------------------

app.get('/profile', (req, res) => {

  // Si front tiene un JWT que yo le di en el pasado
  // y además coincide con el que debería tener siendo él/ella/ello

  if (req.headers.authorization.length) {
    jwt decode => email
    if( find(email) BD ) => secret
      if( jwt === hash(secret) )
        res.send("Tus cosas");
  }
  else {
    res.redirect('/login');
  }
});

2. Ejemplo de petición a zona privada
-------------------------------------

function isDate(date) {
  const pattern = /\d{4}\/[0-1]\d\/[0-3]\d/g;

  return pattern.test(date);
}

let result = isDate('2021/03/23');
console.log(result);
*/