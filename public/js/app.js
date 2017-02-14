//Places constructor
var Places = function() {
    this.places = [];



    this.form = $('#places-form');
    this.form.submit(this.onAddPlaceSubmit.bind(this));

    this.input = $('#place');

    this.form.on('click', '.fa-pencil',
        this.onEditPlaceClicked.bind(this));
    this.form.on('click', '.fa-times',
        this.onDeletePlaceClicked.bind(this));
    this.form.on('keydown', '.edit-box-places',
        this.onEditPlace.bind(this));

    this.getPlaces();
};

//Books constructor
var Books = function() {
    this.books = [];

    this.form = $('#books-form');
    this.form.submit(this.onAddBookSubmit.bind(this));

    this.input_title = $('#title');
    this.input_author = $('#author');

    this.form.on('click', '.fa-pencil',
        this.onEditBookClicked.bind(this));
    this.form.on('click', '.fa-times',
        this.onDeleteBookClicked.bind(this));
    this.form.on('keydown', '.edit-box-title',
        this.onEditBook.bind(this));

    this.form.on('keydown', '.edit-box-author',
        this.onEditBook.bind(this));
    this.getBooks();
};
//Restaurants constructor
var Restaurants = function() {
    this.restaurants = [];

    this.form = $('#restaurants-form');
    this.form.submit(this.onAddRestaurantSubmit.bind(this));

    this.input_name = $('#name');
    this.input_loc = $('#loc');

    this.form.on('click', '.fa-pencil',
        this.onEditRestaurantClicked.bind(this));
    this.form.on('click', '.fa-times',
        this.onDeleteRestaurantClicked.bind(this));
    this.form.on('keydown', '.edit-box-name',
        this.onEditRestaurant.bind(this));

    this.form.on('keydown', '.edit-box-loc',
        this.onEditRestaurant.bind(this));

    this.getRestaurants();
};

//Post on Submit
Places.prototype.onAddPlaceSubmit = function(event) {
    event.preventDefault();
    var value = this.input.val().trim();
    if (value != '') {
        var item = { 'name': value };
        var ajax = $.ajax('/items/places', {
            type: 'POST',
            data: JSON.stringify(item),
            dataType: 'json',
            contentType: 'application/json'
        });
        ajax.done(this.getPlaces.bind(this));
        this.form[0].reset();
    }
}

Books.prototype.onAddBookSubmit = function(event) {
    event.preventDefault();
    var title = this.input_title.val().trim();
    var author = this.input_author.val().trim();
    if (title != '' && author != '') {
        var item = { 'title': title, 'author': author };
        var ajax = $.ajax('/items/books', {
            type: 'POST',
            data: JSON.stringify(item),
            dataType: 'json',
            contentType: 'application/json'
        });
        ajax.done(this.getBooks.bind(this));
        this.form[0].reset();
    }
}

Restaurants.prototype.onAddRestaurantSubmit = function(event) {
        event.preventDefault();
        var name = this.input_name.val().trim();
        var loc = this.input_loc.val().trim();
        if (name != '' && loc != '') {
            var item = { 'name': name, 'loc': loc };
            var ajax = $.ajax('/items/restaurants', {
                type: 'POST',
                data: JSON.stringify(item),
                dataType: 'json',
                contentType: 'application/json'
            });
            ajax.done(this.getRestaurants.bind(this));
            this.form[0].reset();
        }
    }
    //Fetch items on get call
Places.prototype.getPlaces = function() {
    var ajax = $.ajax('/items/places', {
        type: 'GET',
        dataType: 'json'

    });
    ajax.done(this.onGetPlacesDone.bind(this));
}

Books.prototype.getBooks = function() {
    var ajax = $.ajax('/items/books', {
        type: 'GET',
        dataType: 'json'

    });
    ajax.done(this.onGetBooksDone.bind(this));

}

Restaurants.prototype.getRestaurants = function() {
        var ajax = $.ajax('/items/restaurants', {
            type: 'GET',
            dataType: 'json'

        });
        ajax.done(this.onGetRestaurantsDone.bind(this));

    }
    //Pass info from api to update the view on the front end
Places.prototype.onGetPlacesDone = function(items) {
    this.items = items;
    this.updatePlacesView(items);
};

Books.prototype.onGetBooksDone = function(books) {
    this.books = books;
    this.updateBooksView(books);

};

Restaurants.prototype.onGetRestaurantsDone = function(restaurants) {
    this.restaurants = restaurants;
    this.updateRestaurantsView(restaurants);

};
//Modify the frontend to display information retrieved from the server
Places.prototype.updatePlacesView = function(data) {
    $('#places').empty();
    for (index in data) {
        $('#places').append('<li id=' + data[index]._id + '><input type="text" class="edit-box-places" style="display:none;" value="' + data[index].name + '"></input><p class="style-name set-width">' + data[index].name + '</p><i class="fa fa-pencil" aria-hidden="true"></i> <i class="fa fa-times" aria-hidden="true"></i></li>');
    }
}

Books.prototype.updateBooksView = function(books) {
    $('#books').empty();
    for (index in books) {
        $('#books').append('<li id=' + books[index]._id + '><input type="text" class="edit-box-title" style="display:none;" value="' + books[index].title + '"></input><p class="style-name set-width">' + books[index].title + '</p><input type="text" class="edit-box-author" style="display:none;" value="' + books[index].author + '"></input><p class="style-name set-width"> ' + books[index].author + '</p><i class="fa fa-pencil" aria-hidden="true"></i> <i class="fa fa-times" aria-hidden="true"></i></li>');
    }
}

Restaurants.prototype.updateRestaurantsView = function(restaurants) {
        $('#restaurants').empty();
        for (index in restaurants) {
            $('#restaurants').append('<li id=' + restaurants[index]._id + '><input type="text" class="edit-box-name" style="display:none;" value="' + restaurants[index].name + '"></input><p class="style-name set-width">' + restaurants[index].name + ' </p><input type="text" class="edit-box-loc" style="display:none;" value="' + restaurants[index].loc + '"></input><p class="style-name set-width">' + restaurants[index].loc + '</p><i class="fa fa-pencil" aria-hidden="true"></i> <i class="fa fa-times" aria-hidden="true"></i></li>');
        }
    }
    //Create a way to users to edit items entered 
Places.prototype.onEditPlaceClicked = function(event) {
    var id = $(event.target).parent('li').prop('id');
    var editAction = this.editPlace;
    var elementToEdit = $(event.target).parent('li');
    elementToEdit.children().toggle();

}

Books.prototype.onEditBookClicked = function(event) {
    var id = $(event.target).parent('li').prop('id');
    var editAction = this.editBook;
    var elementToEdit = $(event.target).parent('li');
    elementToEdit.children().toggle();

}

Restaurants.prototype.onEditRestaurantClicked = function(event) {
        var id = $(event.target).parent('li').prop('id');
        var editAction = this.editRestaurant;
        var elementToEdit = $(event.target).parent('li');
        elementToEdit.children().toggle();

    }
    //Retrieve the new value of the edited item and pass it to the function that will make a put request
Places.prototype.onEditPlace = function(event) {
    var id = $(event.target).parent('li').prop('id');
    var elementToEdit = $(event.target).parent('li');

    if (event.which === 13) {

        elementToEdit.children().toggle();
        this.editPlace(id, elementToEdit.find('input').val());

    } else if (event.which === 27) {

        elementToEdit.children().toggle();
        this.editPlace(id, elementToEdit.find('input').val());

    } 

}

Books.prototype.onEditBook = function(event) {
    var id = $(event.target).parent('li').prop('id');
    var titleToEdit = $(event.target).parent('li').find('.edit-box-title');
    var authorToEdit = $(event.target).parent('li').find('.edit-box-author');

    if (event.which === 13) {
        titleToEdit.children().toggle();
        authorToEdit.children().toggle();
        this.editBook(id, titleToEdit.val(), authorToEdit.val());
    } else if (event.which === 27) {
        titleToEdit.children().toggle();
        authorToEdit.children().toggle();
        this.editBook(id, titleToEdit.val(), authorToEdit.val());
    }

}

Restaurants.prototype.onEditRestaurant = function(event) {
    var id = $(event.target).parent('li').prop('id');
    var nameToEdit = $(event.target).parent('li').find('.edit-box-name');
    var locToEdit = $(event.target).parent('li').find('.edit-box-loc');

    if (event.which === 13) {
        nameToEdit.children().toggle();
        locToEdit.children().toggle();
        this.editRestaurant(id, nameToEdit.val(), locToEdit.val());
    } else if (event.which === 27) {
        nameToEdit.children().toggle();
        locToEdit.children().toggle();
        this.editRestaurant(id, nameToEdit.val(), locToEdit.val());
    }
}

//Get the id of item to be deleted and pass it to the function that handles the delete call to the server
Places.prototype.onDeletePlaceClicked = function(event) {

    var id = $(event.target).parent('li').prop('id');
    this.deletePlace(id);
}

Books.prototype.onDeleteBookClicked = function(event) {

    var id = $(event.target).parent('li').prop('id');
    this.deleteBook(id);
}

Restaurants.prototype.onDeleteRestaurantClicked = function(event) {

        var id = $(event.target).parent('li').prop('id');
        this.deleteRestaurant(id);
    }
    //Make a PUT request and send the new api info to the appropriate get function to display the new results
Places.prototype.editPlace = function(id, edited) {
    var item = { 'name': edited, 'id': id };
    var ajax = $.ajax('/items/places/' + id, {
        type: 'PUT',
        data: JSON.stringify(item),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(this.getPlaces.bind(this));
}

Books.prototype.editBook = function(id, editedTitle, editedAuthor) {
    var item = { 'title': editedTitle, 'author': editedAuthor, 'id': id };
    var ajax = $.ajax('/items/books/' + id, {
        type: 'PUT',
        data: JSON.stringify(item),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(this.getBooks.bind(this));
}

Restaurants.prototype.editRestaurant = function(id, editedName, editedLoc) {
        var item = { 'name': editedName, 'loc': editedLoc, 'id': id };
        var ajax = $.ajax('/items/restaurants/' + id, {
            type: 'PUT',
            data: JSON.stringify(item),
            dataType: 'json',
            contentType: 'application/json'
        });
        ajax.done(this.getRestaurants.bind(this));
    }
    //Make a DELETE request and send to the appropriate get function for the item
Places.prototype.deletePlace = function(id) {
    var ajax = $.ajax('/items/places/' + id, {
        type: 'DELETE',
        dataType: 'json'
    });
    ajax.done(this.getPlaces.bind(this));
}

Books.prototype.deleteBook = function(id) {
    var ajax = $.ajax('/items/books/' + id, {
        type: 'DELETE',
        dataType: 'json'
    });
    ajax.done(this.getBooks.bind(this));
}

Restaurants.prototype.deleteRestaurant = function(id) {
    var ajax = $.ajax('/items/restaurants/' + id, {
        type: 'DELETE',
        dataType: 'json'
    });
    ajax.done(this.getRestaurants.bind(this));
}

$(document).ready(function() {
    //Call the respective functions after page loads
    new Places();
    new Books();
    new Restaurants();
});
