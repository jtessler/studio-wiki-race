import $ from 'jquery';

export default class WikiApi {

  /**
   * Returns a Promise that returns a list of random article titles based on
   * the given count. If no argument is supplied, it defaults to 1.
   */
  static getRandomArticles(count) {
    var params = {
      list: 'random',
      rnlimit: count || 1,
      rnnamespace: 0,
    };
    return queryWikiApi(params).then(function(data) {
      var pages = data.query.random;
      return pages.map(page => page.title);
    });
  }

  /**
   * Returns a Promise that, on success, returns a 500 character summary of the
   * Wikipedia article matching the given Title.
   */
  static getSummary(title) {
    var params = {
      exchars: 500,
      exintro: true,
      explaintext: true,
      prop: 'extracts',
      titles: title,
    };
    return queryWikiApi(params).then(function(data) {
      var page_ids = Object.keys(data.query.pages);
      if (page_ids.length === 0) {
        console.warn('No pages match title: ' + title);
        throw(data.query);
      }

      var first_page = data.query.pages[page_ids[0]];
      if ('extract' in first_page) {
        return first_page.extract;
      } else {
        console.warn('No summary available for title: ' + title);
        throw(data.query);
      }
    });
  }

  /**
   * Returns a Promise that, on success, returns the first 500 links within the
   * Wikipedia article for the given title. Only return links in the 'Main'
   * namespace.
   */
  static getLinks(title, plcontinue) {
    var params = {
      pllimit: 500,
      plnamespace: 0,
      prop: 'links',
      titles: title,
    };
    if (plcontinue) {
      params.plcontinue = plcontinue;
    }

    return queryWikiApi(params).then(function(data) {
      var page_ids = Object.keys(data.query.pages);
      if (page_ids.length === 0) {
        console.warn('No pages match title: ' + title);
        throw(data.query);
      }

      var first_page = data.query.pages[page_ids[0]];
      if ('links' in first_page) {
        var links = first_page.links.map(link => link.title);

        if('continue' in data) {
          var plcontinue = data.continue.plcontinue;
          return WikiApi.getLinks(title, plcontinue).then(function(nextLinks) {
            return links.concat(nextLinks);
          });
        } else {
          return links;
        }
      } else {
        console.warn('No links available for title: ' + title);
        throw(data.query);
      }
    });
  }
}

// Private function for the WikiApi module.
function queryWikiApi(queryParams) {
  var params = $.extend(queryParams, {
    action: 'query',
    format: 'json',
    origin: '*',
    redirects: true,
  });
  return $.get('https://en.wikipedia.org/w/api.php', params)
      .then(function(data) {
        if ('errors' in data) {
          console.error('Wiki API returned errors:', data.errors);
          throw(data);
        }
        if ('warnings' in data) {
          console.warn('Wiki API returned warnings:', data.warnings);
          throw(data);
        }
        return data;
      })
      .catch(function(data) {
        console.error('Wiki API call failed:', data);
      });
}
