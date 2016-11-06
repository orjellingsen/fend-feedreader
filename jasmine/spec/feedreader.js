/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  describe('RSS Feeds', function() {
  	// TEST: Make sure that allFeeds are defined and not empty
    // CONFIRM: delete the allFeeds array or its contents
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // TEST: Loop trough each feed in allFeeds and check if url exists and that it is not empty
    // CONFIRM: remove the url entry from one of the feeds in allFeeds, or deleting its contents
    it('has url defined and not empty', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        var url = allFeeds[i].url;
        expect(url).toBeDefined();
        expect(url.length).not.toBe(0);
      }
    });

    // TEST: Loop trough each feed in allFeeds and check if name exist and that it is not empty
    // CONFIRM: remove the name entry from one of the feeds in allFeeds, or delete its contents
    it('has name defined and not empty', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        var name = allFeeds[i].name;
        expect(name).toBeDefined();
        expect(name.length).not.toBe(0);
      }
    });
  });

  // The Menu suite
  describe('The menu', function() {
    var hasClass,
    classCheck;

    // TEST: Check that the menu is hidden by default
    // CONFIRM: remove the menu-hidden class from body in index.html
    it('is hidden by default', function() {
      // The menu is hidden by the menu-hidden class on body
      hasClass = $('body').hasClass('menu-hidden');
      // Check if body have this class when the page loads
      expect(hasClass).toBeTruthy();
    });

    // TEST: Check that the menu change visibility when menu icon is clicked
    // CONFIRM: remove the toggle on click function in app.js
    it('change visibility when menu icon is clicked', function() {
      // Trigger a click on the menu button.
      // Since it defaults to hidden, this click will open the menu
      $('.menu-icon-link').trigger('click');
      // Check if menu-hidden class was removed from body element
      hasClass = $('body').hasClass('menu-hidden');
      expect(hasClass).toBeFalsy();

    	// Trigger another click to close the menu again
      $('.menu-icon-link').trigger('click');
      // Check that the menu-hidden class was re-added to body element
      hasClass = $('body').hasClass('menu-hidden');
      expect(hasClass).toBeTruthy();
    });
  });

  // Initial Entries suite
  describe('Initial Entries', function() {
    // Run this function first to ensure that content is loaded before we begin the test
    beforeEach(function(done) {
      loadFeed(0, done);
  	});

    // TEST: Ensure that at least one entry is loaded when loadFeed function is called
    // done parameter is passed into the function to let it know that it is done loading
    // CONFIRM: remove entry html in index.html so no entries can show
    it('has at least one entry', function(done) {
      // Checking that entries are not empty
      var entryLength = $('.feed .entry').length;
      expect(entryLength).not.toBe(0);
      done();
    });
  });

  // New Feed Selection suite
  describe('New Feed Selection', function() {
    var entryFeedOne,
    		entryFeedTwo;
		// This function will run first and request the first feed. The test will not begin until
		// the first feed is loaded and we have found the first entry.
		beforeAll(function(done) {
			loadFeed(0, function() {
				entryFeedOne = $('.entry').eq(0).html();
				done();
			});
		});

    // TEST: Ensure that content actually changes when loadFeed loads a new feed
    // CONFIRM: change the parameter in one of the loadFeed to load the same feed twice
    it('changes content when new feed is loaded', function(done) {
			// Requesting the second feed for comparison.Since anything I put outside this function
			// will not wait, I keep the expect inside loadFeed to force it to wait for the feed to load.
			loadFeed(1, function() {
				entryFeedTwo = $('.entry').eq(0).html();
				expect(entryFeedOne).not.toEqual(entryFeedTwo);
				done();
			});
    });
  });
}());
