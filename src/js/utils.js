/**
 * Dummy utility class to demonstrate a basic JS
 * structure and assoiciated test
 * @param {Object} params - containing:
 * @param {String} homePagePath - the pathname of the homepage (defaults to '/')
 */
class Utils {
	constructor(params) {
		this.params = Object.assign({
			homePagePath: '/'
		}, params);

    this.monthLabels = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    this.meridiesLabel = [
      'AM',
      'PM',
    ];
	}

	/**
	 * Is the user on the hompage
	 * @return {Boolean}
	 */
	isHomePage() {
		return document.location.pathname === this.params.homePagePath;
	}

	/**
	 * Checks if a value is a date string in ISO format
	 * @return {Boolean}
	 */
  isISODateString(value) {
    return /\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}.\d+Z/.test(value);
  }

	/**
	 * Formats an input to a date string
   * Current format is `dd MMM yyyy hh:mmAM` 
	 * @return {String}
	 */
	formatDate(input) {
    const date = typeof input === 'Date'
      ? input
      : new Date(input);

    if (isNaN(date.getTime())) {
      return;
    }

    const rawHours = date.getHours();
    let hours = rawHours % 12;
    if (hours === 0) {
      hours = 12;
    }

    return `${date.getDate()} ${this.monthLabels[date.getMonth()]} ${date.getFullYear()} ${hours % 12}:${date.getMinutes()}${this.meridiesLabel[Math.floor(rawHours / 12)]}`;
	}
}

module.exports = Utils;
