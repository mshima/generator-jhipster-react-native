const navigateToLoginScreen = async () => {
  await expect(element(by.id('launchScreen'))).toBeVisible()
  await element(by.id('menuButton')).tap()
  await element(by.id('loginDrawerButton')).tap()
  await expect(element(by.id('loginScreenUsername'))).toBeVisible()
}

const loginAsUser = async () => {
  await navigateToLoginScreen()
  await element(by.id('loginScreenUsername')).replaceText('user')
  await element(by.id('loginScreenPassword')).replaceText('user')
  await element(by.id('loginScreenLoginButton')).tap()
}

const logout = async () => {
  await element(by.id('menuButton')).tap()
  await element(by.id('logoutDrawerButton')).tap()
}

const goBack = async () => {
  if (device.getPlatform() === 'ios') {
    await element(by.type('_UIBackButtonContainerView')).tap()
  } else {
    await device.pressBack();
  }
}

const scrollTo = async (fieldId, listId) => {
  await waitFor(element(by.id(fieldId))).toBeVisible().whileElement(by.id(listId)).scroll(50, 'down', 0.01, 0.01)
}

module.exports = {
  navigateToLoginScreen,
  loginAsUser,
  goBack,
  logout,
  scrollTo,
}
