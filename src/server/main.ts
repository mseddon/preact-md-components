import { FOO } from '../shared/foo';
import * as express from 'express';
import * as compression from 'compression';

console.log(FOO);
let app = express();
app.use(compression())
app.use(express.static(__dirname+"/../../www"));

app.listen(3000);