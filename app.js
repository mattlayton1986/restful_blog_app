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
app.get('/blogs/new', (req, res) => {
	res.render('new');
});

// CREATE
app.post('/blogs', (req, res) => {
	// create blog
	Blog.create(req.body.blog, (err, newPost) => {
		if (err) {
			res.render('new');
		} else {
			res.redirect('/blogs');
		}
	});
	// then, redirect to index

});

// SHOW
app.get('/blogs/:id', (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('show', { blog: foundBlog });
		}
	});
});

// EDIT

// UPDATE

// DELETE


// *** Serve App *** //
app.listen(3000, () => {
	console.log('Blog server is running on port 3000');
});