// @ts-nocheck
import bootstrap from './bootstrap';

fetch('/api/mfe')
  .then((response) => response.json())
  .then((data) => {
    data.map(({ name, url }) => (window[`__${name}__`] = url));
    bootstrap(() => {});
  });
