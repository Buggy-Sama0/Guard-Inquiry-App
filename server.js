
const bodyParser = require('body-parser');
const express=require('express');
const mysqlConnection=require('./models/database.js');

const app=express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(bodyParser.json());




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Read 
app.get('/search/:name', (req, res) => {

    mysqlConnection.query(
        "SELECT * FROM Guard where Name=?",
        [req.params.name],
        (err,data) => {
            if (err) {
                console.log(err); 
            }
            
            res.status(200).json(data);
        }
    );
    
        
});


app.get('/update/:name', (req, res) => {


    mysqlConnection.query(
        'SELECT * FROM Guard where Name=?',
        [req.params.name],
        (err, data) => {
            if (err) {
                console.log(err); 
            }
            res.status(200).render('edit', {guard:data[0]});
        }
    )
});


// Update 
app.post('/update/:name', (req, res) => {

    const {name,BirthDate,CWR_Expiry_Date,SPP_Expiry_Date,Workplace}=req.body;
    const guardName=req.params.name;
    
    mysqlConnection.query(
        'UPDATE Guard SET Name=?, Date_of_birth=?, CWR_Expiry_Date=?, SPP_expiry_date=?, Workplace=? WHERE Name=? ',
        [name,BirthDate,CWR_Expiry_Date,SPP_Expiry_Date,Workplace,guardName],
        (err, data) => {
            if (err) {
                console.log(err); 
            }
            console.log(data);
            res.redirect('/');
        }
    ) 
});


// Delete
app.get('/delete/:name', (req, res) => {

    mysqlConnection.query('DELETE FROM Guard WHERE Name=?',
        [req.params.name],
        (err, data) => {
            if (err) console.log(err);

            console.log('Successfully Deleted');
            res.redirect('/');
        }
    )
});


// Summary of guards
app.get('/show', (req, res) => {

    const sql='SELECT Name, Workplace, datediff(SPP_Expiry_Date,curdate()) AS daysLeft from Guard WHERE datediff(SPP_Expiry_Date,curdate())<=90 AND datediff(SPP_Expiry_Date,curdate())>0 ORDER BY daysLeft;';
    mysqlConnection.query(sql,
        (err, result)=> {
            if (err) console.log(err);     
            

            res.status(200).json(result);
        }
    )
});


app.listen(process.env.PORT || 2030, ()=> {
	console.log(`Server running at http://localhost:${2030}`);
});

``
	
















