describe('hasthelargehadroncolliderdestroyedtheworldyet', () => {
  // TODO: find a way to automate authentication for the extension
  // Currently requires an initial login prior
  beforeEach(() => {
    // cy.visit('http://hasthelargehadroncolliderdestroyedtheworldyet.com/')
    cy.visit('https://github.com/') // Need a site with input to type keyboard shortcut
  })

  it('should load save to pocket extension', () => {
    // TODO: find a way to automate triggering the extension
    // Currently using a pause to manually trigger the popup

    cy.get('auto-check:first input').type('{shift}{cmd}P')
    cy.pause().then(() => {
      const $iframe = window.top.document.querySelector('iframe[src^=chrome]')
      expect($iframe !== null).to.be.true
    })

    // cy.pause()
    // cy.get()
    //   .then(function ($iframe) {
    //     debugger;
    //     cy.log('got extension iframe 🔥🔥🔥 inside cypress!')
    //     console.log({$iframe})
    //     cy.debug()
    //     const $body = $iframe.contents().find('body')
    //     cy
    //       .wrap($body)
    //       .find('input:eq(0)')
    //       .type('testTag')
    //   })
  })
})
