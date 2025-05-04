import { getStylesForWidth } from '../../support/utils/helpers';


describe('Card Styles Test', () => {
    // const viewports = [1600, 1200, 992, 768, 576, 375];
    // const viewports = [1600, 1200];
    const viewports = [1200];
    let allStyles;
    let xPathSelector;
    let url;
    before(() => {
        cy.fixture('styling/cardStyles').then((loadedStyles) => {
            allStyles = loadedStyles;
            xPathSelector = allStyles.common.xPathSelector;
            url = allStyles.common.url;
        });
    });

    viewports.forEach((width) => {
        it(`should check the card size at ${width}px width`, () => {
            cy.viewport(width, 1000);
            cy.visit(url);

            let styles = getStylesForWidth(allStyles, width);

            const card = cy.xpath(xPathSelector);
            card.should('have.css', 'width', styles.width + 'px');
            card.shouldHaveCss('width', styles.width + 'px');

            cy.xpath(xPathSelector).should('exist').and('be.visible').then($el => {
                const computedStyles = window.getComputedStyle($el[0]);
                cy.log('width:', computedStyles.width);
                cy.log('height:', computedStyles.height);
                assert.equal(computedStyles.width, styles.width + 'px');
                cy.sizeShouldBeInRange(computedStyles.height, styles.height + 'px');
            })
        });

        it(`should check the header card background at ${width}px width`, () => {
            cy.viewport(width, 1000);
            cy.visit(url);

            cy.xpath(xPathSelector).within(() => {
                cy.xpath('.//div').then($div => {
                    const beforeStyles = window.getComputedStyle($div[0], '::before');
                    assert.equal(beforeStyles.backgroundImage, allStyles.common.headerGradient);
                })
            })
        });

        it(`should check the header font size and color at ${width}px width`, () => {
            cy.viewport(width, 1000);
            cy.visit(url);

            let styles = getStylesForWidth(allStyles, width);

            cy.xpath(xPathSelector).within(() => {
                cy.xpath('.//div/div').then($div => {
                    const beforeStyles = window.getComputedStyle($div[0]);
                    assert.equal(beforeStyles.fontSize, styles.header.fontSize + 'px');
                    assert.equal(beforeStyles.color, allStyles.common.header.fontColor);
                })
            })
        });

        it(`should check the eaybrow font size and color at ${width}px width`, () => {
            cy.viewport(width, 1000);
            cy.visit(url);

            let styles = getStylesForWidth(allStyles, width);

            cy.xpath(xPathSelector).within(() => {
                cy.xpath('.//div[2]/div').then($div => {
                    const beforeStyles = window.getComputedStyle($div[0]);
                    assert.equal(beforeStyles.fontSize, styles.eyebrow.fontSize + 'px');
                    assert.equal(beforeStyles.color, allStyles.common.eyebrow.fontColor);
                })
            })
        });

        it(`should check the title font size and color at ${width}px width`, () => {
            cy.viewport(width, 1000);
            cy.visit(url);

            let styles = getStylesForWidth(allStyles, width);

            cy.xpath(xPathSelector).within(() => {
                cy.xpath('.//div/div[2]/h3').then($div => {
                    const beforeStyles = window.getComputedStyle($div[0]);
                    assert.equal(beforeStyles.fontSize, styles.title.fontSize + 'px');
                    assert.equal(beforeStyles.color, allStyles.common.title.fontColor);
                })
            })
        });
        // it(`Second test should check the card styles at ${width}px width`, () => {
        //     cy.log('Second test');

        // });

    });
});