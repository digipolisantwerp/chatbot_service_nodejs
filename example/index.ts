require('dotenv-safe').config();
import * as app from './express';

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Example app listening on port ' + port + '!'));

process.on('unhandledRejection', (e) => {
  console.error('unhandledRejection', e.message);
});

export = app;
