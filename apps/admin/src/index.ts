// @ts-nocheck
import bootstrap from './bootstrap';

fetch('/api/mfe')
  .then((response) => response.json())
  .then((data) => {
    data.map((value) => (window[`__${value.name}__`] = value.url));
    bootstrap(() => {});
  });
