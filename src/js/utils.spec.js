const Utils = require("./utils");

describe( 'Utils', () => {
	describe( 'isHomePage', () => {
		it("should match if on homepage", () => {
			const utils = new Utils();
			window.history.pushState({}, "", "/");
			expect(utils.isHomePage()).toBeTruthy();
		});

		it("should match if on homepage and has query parameters", () => {
			const utils = new Utils();
			window.history.pushState({}, "", "/?foo=bar");
			expect(utils.isHomePage()).toBeTruthy();
		});

		it("should match if on homepage and has hash navigation", () => {
			const utils = new Utils();
			window.history.pushState({}, "", "/#foo");
			expect(utils.isHomePage()).toBeTruthy();
		});

		it("should not match if on another page", () => {
			const utils = new Utils();
			window.history.pushState({}, '', '/news');
			expect(utils.isHomePage()).toBeFalsy();
		});

		it("should match with different homepage parameter", () => {
			const utils = new Utils({
				homePagePath: '/home'
			});
			window.history.pushState({}, "", "/home");
			expect(utils.isHomePage()).toBeTruthy();
		});
	});

	describe( 'formatDate', () => {
		it("should match value ISO date string", () => {
      const value = '2020-11-08T08:39:00';

      const utils = new Utils();
			expect(utils.formatDate(value)).toBeTruthy();
		});

		it("should not match non-ISO format dates", () => {
      const value = '30 Aug 2020 7:52AM';

      const utils = new Utils();
			expect(utils.isISODateString(value)).toBeFalsy();
		});

		it("should not match any string", () => {
      const value = 'test';

      const utils = new Utils();
			expect(utils.formatDate(value)).toBeFalsy();
		});

		it("should not match invalid ISO date string", () => {
      const value = '2020-92-86T72:95:86';

      const utils = new Utils();
			expect(utils.formatDate(value)).toBeFalsy();
		});
	});

	describe( 'formatDate', () => {
		it("should format date as AM", () => {
      const date = new Date(2020, 7, 30, 7, 52);
      const dateString = '30 Aug 2020 7:52AM';

      const utils = new Utils();
			expect(utils.formatDate(date)).toEqual(dateString);
		});

    it("should format date as PM", () => {
      const date = new Date(2020, 1, 22, 19, 47);
      const dateString = '22 Feb 2020 7:47PM';

      const utils = new Utils();
			expect(utils.formatDate(date)).toEqual(dateString);
		});

		it("should format date up to minutes", () => {
      const date = new Date(2020, 5, 18, 13, 24, 45, 200);
      const dateString = '18 Jun 2020 1:24PM';

      const utils = new Utils();
			expect(utils.formatDate(date)).toEqual(dateString);
		});

		it("should format date from string", () => {
      const date = '2020-11-08T08:39:00';
      const dateString = '8 Nov 2020 8:39AM';

      const utils = new Utils();
			expect(utils.formatDate(date)).toEqual(dateString);
		});

		it("should not format invalid input", () => {
      const date = 'test';

      const utils = new Utils();
			expect(utils.formatDate(date)).toBeUndefined();
		});

		it("should not format invalid date input", () => {
      const date = '2020-92-86T72:95:86';

      const utils = new Utils();
			expect(utils.formatDate(date)).toBeUndefined();
		});
	});
});
