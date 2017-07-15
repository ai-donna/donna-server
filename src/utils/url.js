'use strict';

const URL                    = require('url');
const tld                    = require('tldjs');

const REGULAR_EXPRESSIONS   = require('./regex');

var urlUtils = {

    /**
    * @function isValidURI
    * @description Validate if a passed string is a valud URI according to: https://gist.github.com/dperini/729294
    *
    * @param  {String}  url      the url we wish to execute its hostname
    * @return {Boolean} boolean to indicate if the string is valid URI or not
    */
    isValidURI: function isValidURI(url) {

      if (!!url) {

          const URI_REGEX = REGULAR_EXPRESSIONS.URI;
          let isValidURI  = URI_REGEX.test(url.replace(/\s\s+/g,"").trim());

          // Check if the URI provided is a valid IPv4 or IPv6 URI
          // Note: We need to remove the protocol at the beginning HTTP, HTTPS, FTP
          return isValidURI || REGULAR_EXPRESSIONS.IPAddresses.test(url.replace(/http:\/\/|https:\/\/|ftp:\/\//, ''));

      } else return false;
    },

    /**
    * @function getHostName
    * @description Extracting the hostname from a url is generally easier than parsing the domain.
    * The hostname of a url consists of the entire domain plus sub-domain.
    * We can easily parse this with a regular expression, which looks for everything to the left of the double-slash in a url.
    * We remove the “www” (and associated integers e.g. www2), as this is typically not needed when parsing the hostname from a url
    *
    * @param  {String} url      the url we wish to execute its hostname
    * @return {String} hostname the extracted hostname
    */
    getHostName: function getHostName(url) {

        // First, lets check if we have a valid url passed
        if (!!url && urlUtils.isValidURI(url)) {

          url = url.replace(/\s\s+/g,"").trim();

            // Extract the hostname properly from the url provided
            let hostName  = URL.parse(url).hostname;
            let match     = hostName.match(/(www[0-9]?\.)?(.[^/:]+)/i);

            if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
                return REGULAR_EXPRESSIONS.IPAddresses.test(url.replace(/http:\/\/|https:\/\/|ftp:\/\//, '').replace(/(\/)+$/, '')) ? url.replace(/http:\/\/|https:\/\/|ftp:\/\//, '').replace(/(\/)+$/, ''): match[2];
            } else return url;

        } else return null;
    },

   /**
    * @function getDomain
    * @description We can extract the domain from a url by leveraging our method for parsing the hostname.
    * Since the above getHostName() method gets us very close to a solution, we just need to remove the sub-domain and clean-up special cases (such as .co.uk)
    *
    * @param  {String} url     the url we wish to extract its domain
    * @return {String} domain  the extracted domain
    */
    getDomain: function getDomain(url) {

        // First, lets check if we have a valid url passed
        if (urlUtils.isValidURI(url)) {

          url = url.replace(/\s\s+/g,"").trim();

            // We will be using the hostname as our base and fallback to the cleaned URI afterwards
            var hostName = REGULAR_EXPRESSIONS.IPAddresses.test(urlUtils.getHostName(url)) ? urlUtils.getHostName(url) : url.replace(/http:\/\/|https:\/\/|ftp:\/\//, '').replace(/(\/)+$/, '');

            // check if the hostname is an IPv4 or IPv6 address http://jsfiddle.net/AJEzQ/
            if (REGULAR_EXPRESSIONS.IPAddresses.test(hostName)) {
                return REGULAR_EXPRESSIONS.IPAddresses.test(hostName) ? hostName : url.replace(/http:\/\/|https:\/\/|ftp:\/\//, '').replace(/(\/)+$/, '');
            } else  return tld.getDomain(hostName);

        } else return null;
    },

   /**
    * @function getDomainName
    * @description Extract the main domain without the .domain notation
    *
    * @param  {String} url     the url we wish to extract its domain
    * @return {String} domain  the extracted domain
    */
    getDomainName: function getDomainName(url) {

        // First, lets check if we have a valid url passed
        if (!!url && urlUtils.isValidURI(url)) {

          url = url.replace(/\s\s+/g,"").trim();

            let domainName = urlUtils.getDomain(url);
            return domainName.replace(`.${tld.getPublicSuffix(domainName)}`, '');
        } else return null;
    }
}

module.exports  = urlUtils;
