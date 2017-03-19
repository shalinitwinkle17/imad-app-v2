var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user: 'shalinitwinkle17',
    database: 'shalinitwinkle17',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password:'db-shalinitwinkle17-67794'
};
var app = express();
app.use(morgan('combined'));
var pool = new Pool(config);
app.get('/test-db',function(req, res){
    pool.query('SELECT *FROM test',function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
})
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function createTemplate (data) {
    var HTMLtemplate = `
    <html>
        <head>
            <title>
                ${data.title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
        <div class="box">
            <div>
                <a href="/">Home</a>
            </div>
            <h2>
                $(data.heading)
            </h2>
            <div>
                $(data.date)
            </div>
            <div>
                $(data.content)
            </div>
        </div>
    </body>
    </html>
`
    return HTMLtemplate;
}

app.get('/article/:articleName', function (req, res){
    pool,query("SELECT * FROM article WHERE title = '" + req.params.articleName + "'", function (req, res) {
        if(err) {
            res.status(500).send(err.toString());
        }
        else {
            if (result.rows.length === 0) {
                res.status(404).send('Article not found');
            }
            else{
                var aticleData = result.rows[0];
                res.send(createTemplate(articleData));          
            }
        }
    });
});

app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/yr.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'yr.jpg'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
