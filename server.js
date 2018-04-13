var express = require('express'),
app = express();

  app.use((req, res, next) => {
    if (req.header 'x-forwarded-proto' !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })

//app.use(express.static('www'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), "0.0.0.0", function () {
    console.log('Express server listening on port ' + app.get('port'));
});