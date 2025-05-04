import { getStylesForWidth } from '../../support/utils/helpers';


describe('Card Styles Test', () => {
    const viewports = [1600, 1200, 992, 768, 576, 375];
    // const viewports = [1600, 1200];
    // const viewports = [1200];
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
        describe(`Viewport ${width}px`, { testIsolation: false }, () => {
            before(() => {
                cy.viewport(width, 1000);
                cy.visit(url);
            });

            it(`should check the card size`, () => {
                let styles = getStylesForWidth(allStyles, width);

                const card = cy.xpath(xPathSelector);
                card.should('have.css', 'width', styles.width + 'px');
                card.shouldHaveCss('width', styles.width + 'px');

                cy.xpath(xPathSelector).should('exist').and('be.visible').then($el => {
                    const computedStyles = window.getComputedStyle($el[0]);
                    cy.log('width:', computedStyles.width);
                    cy.log('height:', computedStyles.height);
                    assert.equal(computedStyles.width, styles.width + 'px');
                    expect(computedStyles.width).to.equal(styles.width + 'px');
                    cy.sizeShouldBeInRange(computedStyles.height, styles.height + 'px');
                })
            });

            it(`should check the header card background`, () => {
                cy.xpath(xPathSelector).within(() => {
                    cy.xpath('.//div').then($div => {
                        const beforeStyles = window.getComputedStyle($div[0], '::before');
                        assert.equal(beforeStyles.backgroundImage, allStyles.common.headerGradient);
                    })
                })
            });

            it(`should check the header font size and color`, () => {
                let styles = getStylesForWidth(allStyles, width);

                cy.xpath(xPathSelector).within(() => {
                    cy.xpath('.//div/div').then($div => {
                        const headerStyles = window.getComputedStyle($div[0]);
                        assert.equal(headerStyles.fontSize, styles.header.fontSize + 'px');
                        assert.equal(headerStyles.color, allStyles.common.header.fontColor);
                    })
                })
            });

            it(`should check the eyebrow font size and color`, () => {
                let styles = getStylesForWidth(allStyles, width);

                cy.xpath(xPathSelector).within(() => {
                    cy.xpath('.//div[2]/div').then($div => {
                        const eyebrowStyles = window.getComputedStyle($div[0]);
                        assert.equal(eyebrowStyles.fontSize, styles.eyebrow.fontSize + 'px');
                        assert.equal(eyebrowStyles.color, allStyles.common.eyebrow.fontColor);
                    })
                })
            });

            it(`should check the title font size and color`, () => {
                let styles = getStylesForWidth(allStyles, width);

                cy.xpath(xPathSelector).within(() => {
                    cy.xpath('.//div/div[2]/h3').then($div => {
                        const titleStyles = window.getComputedStyle($div[0]);
                        assert.equal(titleStyles.fontSize, styles.title.fontSize + 'px');
                        assert.equal(titleStyles.color, allStyles.common.title.fontColor);
                    })
                })
            });
        });
    });
});