import express, {Request, Response, Application} from "express";
import cors from "cors";

const app = express();
const port:number = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors)


app.get('/', (req:Request, res:Response )=>{
  res.send('Welcome to AfriBook API')
})

app.listen(port, ()=>{
  console.log(`App is listening on port ${port}`);
  
})