// *** App Initialization *** //

const express			= require('express'),
			app 				= express(),
			bodyParser 	= require('body-parser'),
			mongoose 		= require('mongoose');

mongoose.connect('mongodb://localhost/restful_blog_app');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded( {extended: true} ));

// *** Database / Model Config *** //

var Blog = mongoose.model("Blog", new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
}));

// Blog.create({
// 	title: 'Test Blog',
// 	image: 'https://unsplash.com/photos/o1HS1HOp9Fs',
// 	body: 'HELLO THIS IS A BLOG POST!'
// });

// *** RESTful Routes *** //

// ROOT ROUTE (REDIRECT TO INDEX)
app.get('/', (req, res) => {
	res.redirect('/blogs');
});

// INDEX
app.get('/blogs', (req, res) => {
	Blog.find({}, (err, blogs) => {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { blogs: blogs });
		}
	});
	
})

// NEW

// CREATE

// SHOW

// EDIT

// UPDATE

// DELETE


// *** Serve App *** //
app.listen(3000, () => {
	console.log('Blog server is running on port 3000');
});