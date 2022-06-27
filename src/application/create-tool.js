export class CreateUtilityToolElement {
    create(item) {
        const uTool = document.createElement('utility-tool');
        uTool.id = item.id;
        this.#setUtilityClasses(uTool);

        const { title, link, description, tags } = item;

        const elements = [
            this.#setTitle(title, link),
            this.#setDescription(description),
            this.#setTags(tags),
            this.#setButton()
        ];

        uTool.append(...elements);
        
        return uTool;
    }

    #setUtilityClasses(uTool) {
        uTool.classList.add('max-w');
        uTool.classList.add('shadow-md');
        uTool.classList.add('border');
        uTool.classList.add('p-3');
    }

    #setTitle(title, link) {
        const a = document.createElement('a');

        a.slot = 'title';
        a.href = link;
        a.classList.add('fs-400');
        a.classList.add('text-dark');
        a.classList.add('mb-2'); 

        a.textContent = title;
        
        return a;
    }

    #setTags(tags) {
        const p = document.createElement('p');

        const formatttedTags = tags.map((tag) => {
            return ''.concat('#', tag);
        });

        p.slot = 'tags';
        p.classList.add('bold');

        p.textContent = formatttedTags.join(' ');

        return p;
    }

    #setDescription(description) {
        const p = document.createElement('p');

        p.slot = 'description';
        p.classList.add('fs-300');
        p.classList.add('text-dark'); 
        p.classList.add('mb-2'); 

        p.textContent = description;
        
        return p;
    }

    #setButton() {
        const button = document.createElement('button');
        const span = document.createElement('span');

        button.slot = 'button';
        button.setAttribute('data-utility-tool-element', 'button');
        button.classList.add('btn-remove-tool');
        button.classList.add('flex');
        button.classList.add('items-center');
        button.classList.add('no-gap');
        
        button.appendChild(this.#setDeleteIcon());
        button.appendChild(span);

        span.textContent = 'remove';

        return button;
    }

    #setDeleteIcon() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke', 'currentColor');
        
        svg.classList.add('close-icon');

        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('d', 'M6 18L18 6M6 6l12 12');

        svg.appendChild(path);
        
        return svg;
    }
}
