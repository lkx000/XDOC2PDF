(function(window) {
    class HeaderConverter {
        constructor(config) {
            this.node = null;
            this.config = {};
        }

        convert(element, config) {
            this.node = element;
            this.config = config;
            const level = element.dataset.level;
            const headerConfig = config[level];
            
            if (!headerConfig) return this.node;
            
            switch(headerConfig.mode) {
                case 'key':
                    return this.handleKeyMode(headerConfig.modeConfig);
                // 可以在这里添加其他模式的处理
                default:
                    return this.node;
            }
        }

        handleKeyMode(modeConfig) {
            const content = this.extractContent(this.node);
            const contentLength = content.length;
            const splitHeaders = []
            modeConfig.splitGroup.forEach(config => {
                const position = config.position;
                const key = content.substring(position[0], position[1]);
                splitHeaders.push({
                    key: key,
                    borderStyle: config.borderStyle,
                    style: config.style
                });
            });
            const headerContainer = document.createElement('div');
            headerContainer.style = modeConfig.defaultStyle;
            for (let splitHeader of splitHeaders) {
                const header = document.createElement('div');
                header.style = splitHeader.borderStyle;
                const span = document.createElement('span');
                span.style = splitHeader.style;
                span.textContent = splitHeader.key;
                header.appendChild(span);
                headerContainer.appendChild(header);
            }
            if (!splitHeaders) return this.node;

            return headerContainer
        }

        extractContent(element) {
            return element.textContent.trim();
        }

        extractStyle(element) {
            const computedStyle = window.getComputedStyle(element);
            return {
                fontSize: computedStyle.fontSize,
                fontWeight: computedStyle.fontWeight,
                color: computedStyle.color,
                textAlign: computedStyle.textAlign
            };
        }
    }
    
    window.headerConverter = new HeaderConverter();
})(window);
