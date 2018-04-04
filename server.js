var express = require('express'),
app = express();
app.use(express.static('www'));
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), "0.0.0.0", function () {
    console.log('Express server listening on port ' + app.get('port'));
});