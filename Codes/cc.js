const express = require("express");
const bodyParser = require('body-parser');
const path = require("path"); 
const app = express();
const mysql = require('mysql');
const { createConnection } = require("net");

const port = 8000;

app.use(bodyParser.urlencoded({extended:false}))

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'student'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});



app.use('/static', express.static('static')) 
app.use(express.urlencoded())


app.set('view engine', 'pug') 
app.set('views', path.join(__dirname, 'views')) 
 

app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.get('/register', (req, res)=>{ 
    const params = { }
    res.status(200).render('register.pug', params);
})

app.get('/login', (req, res)=>{ 
    const params = { }
    res.status(200).render('login.pug', params);
})

app.get('/update', (req, res)=>{ 
    const params = { }
    res.status(200).render('update.pug', params);
})

app.get('/', function(req, res){ 
    res.sendFile('register.pug',{ root: __dirname})
});

app.post('/register', function(req, res){ 
    console.log(req.body);
    var sql="insert into info values(null,'"+req.body.prn+"','"+req.body.name+"',"+req.body.phone+",'"+req.body.email+"','"+req.body.branch+"','"+req.body.programming+"')";
    
    db.query(sql,function(err){
        if(err) throw err;
        res.render('register',{title:'Data Saved',
        message:'Data Saved Successfully'})
    })
});

app.get('/', function(req, res){ 
    res.sendFile('login.pug',{ root: __dirname})
});

app.post('/register1', function(req, res){ 
    console.log(req.body);
    var sql="insert into phy values('"+req.body.name+"',"+req.body.prn+",'Python-workshop')";
    
    db.query(sql,function(err){
        if(err) throw err;
        res.render('login',{title:'Data Saved',
        message:'Data Saved Successfully'})
    })
});

app.get('/', function(req, res){ 
    res.sendFile('login.pug',{ root: __dirname})
});

app.post('/register2', function(req, res){ 
    console.log(req.body);
    var sql="insert into cod values('"+req.body.name+"',"+req.body.prn+",'Coding-Context')";
    
    db.query(sql,function(err){
        if(err) throw err;
        res.render('login',{title:'Data Saved',
        message:'Data Saved Successfully'})
    })
});

app.get('/', function(req, res){ 
    res.sendFile('login.pug',{ root: __dirname})
});

app.post('/register3', function(req, res){ 
    console.log(req.body);
    // var sql ="'create trigger trig before delete on phy'+ 'for each row' + 'begin' + 'insert into recover (prn,name,event) values (old.prn,old.name,old.event);'+ 'end;' "

    // sql +=" create trigger trigg before delete on cod for each row begin insert into recover (prn,name,event) values (old.prn,old.name,old.event); end; "
    var sql =" if '"+req.body.Event+"'='python' then delete from phy where prn="+req.body.prn+"; else  delete from cod where prn="+req.body.prn+"; end if;"  
    // var sql="insert into cod values('"+req.body.name+"',"+req.body.prn+",'Coding-Context')";
    
    db.query(sql,function(err){
        if(err) throw err;
        res.render('login',{title:'Data Deleted',
        message:'Data Deleted Successfully'})
    })
});


// app.get('/addpost1', (req, res) => {
//     let post = {prn:'1032',name:'bhatta',email:'chirag.7.bhatta@gmail.com'};
//     let sql = 'INSERT INTO posts SET ?';
//     let query = db.query(sql, post, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post 1 added...');
//     });
// });


 //update part


app.get('/', function(req, res){ 
    res.sendFile('update.pug',{ root: __dirname})
});

app.post('/update', function(req, res){ 
    console.log(req.body);
    var sql="CALL updateinfo('"+req.body.name+"',"+req.body.phone+",'"+req.body.email+"','"+req.body.prn+"','"+req.body.branch+"','"+req.body.programming+"')"
    
    db.query(sql,function(err){
        if(err) throw err;
        res.render('login',{title:'Data Saved',
        message:'Data Saved Successfully'})
    })
});


app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});