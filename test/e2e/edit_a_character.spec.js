const chai = require('chai');
const { describe, it, before, after } = require('mocha');
const expect = chai.expect;
describe('edit a character', function () {
	it('should be able to edit a character', function () {
		browser.get('http://localhost:3001');
		element(by.model('name')).sendKeys('Leia');
		element(by.model('height')).sendKeys('156');
		element(by.model('mass')).sendKeys('90');
		element(by.model('hair_color')).sendKeys('brown');
		element(by.model('skin_color')).sendKeys('white');
		element(by.model('eye_color')).sendKeys('purple');
		element(by.model('birth_year')).sendKeys('90NMNM');
		element(by.id('submit')).click().then(function () {
			chai.use(chaiWebdriver(driver));
			driver.get('http://localhost:3001');
			expect('.table_content').dom.to.contain.text('Leia');
			element(by.id('LeiaEdit')).isPresent();
			element(by.id('LeiaEdit')).click().then(function () {
				element(by.model('Leia')).sendKeys("xyz");
				element(by.id('okpurple')).click().then(function () {
					expect('.table_content').dom.to.contain.text('xyz');
				})
			})

		})
	})
})