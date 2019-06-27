import setContactsPage from './setContatsPage';

export default function setPageAnimations() {
  const $page = $('.out');

  if ($page.hasClass('page-contacts')) {
    setContactsPage();
  };
};
