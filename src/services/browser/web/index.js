window.xdoc2pdf = (function () {
  async function xdoc2pdf(html, config) {
    const result = [];
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.innerHTML = html;
    // 横向遍历
    const nodes = Array.from(container.childNodes);
    for (let node of nodes) {
      if (node.dataset.label === 'header') {
        const headerNode = headerConverter.convert(node, config.headerConfig);
        node.replaceWith(headerNode);
      }
    }
    document.body.innerHTML = '';
    result.push(container);
    return result;
  }
  return xdoc2pdf;
})();
