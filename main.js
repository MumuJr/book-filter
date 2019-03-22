var app = new Vue({
	el: '#vue-app',
	data: {
		displayBook: [],
		myBooks: [],
		someValue: ''
	},
	watch: {
		someValue() {
			this.displayBook = this.myBooks.filter(
				(book) =>
					book.description.toLowerCase().includes(this.someValue.toLowerCase()) ||
					book.title.toLowerCase().includes(this.someValue.toLowerCase())
			);
		}
	},
	created() {
		this.bookData();
	},
	methods: {
		bookData: function() {
			fetch('https://api.myjson.com/bins/zyv02', {
				method: 'GET'
			})
				.then(function(response) {
					if (response.status >= 200 && response.status < 300) {
						return response.json();
					} else {
						return Promise.reject(new Error(response.statusText));
					}
				})
				.then(function(data) {
					app.myBooks = app.displayBook = data.books;
				});
		}
	}
});
