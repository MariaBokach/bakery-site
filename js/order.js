document.addEventListener('DOMContentLoaded', () => {

    const date = document.getElementById('date');
    const time = document.getElementById('time');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const tomorrowString = `${yyyy}-${mm}-${dd}`;

    if (date) {
        date.min = tomorrowString;
        date.value = tomorrowString;
    }

    // генерация опций времени
    function generateTimeOptions() {
        if (!time) return;
        time.innerHTML = '<option value="" disabled selected>Выберите время</option>';

        let startMinutes = 9 * 60;
        const endMinutes = 22 * 60;

        for (let minutes = startMinutes; minutes <= endMinutes; minutes += 30) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

            const option = document.createElement('option');
            option.value = timeString;
            option.textContent = timeString;
            time.appendChild(option);
        }
    }

    if (date) {
        generateTimeOptions();
        date.addEventListener('change', generateTimeOptions);
    }




    const productsContainer = document.getElementById('products-container');
    const addBtn = document.querySelector('.btn-add');
    const deliveryPrice = document.getElementById('deliveryPrice');
    const totalPrice = document.getElementById('totalPrice');
    const DELIVERY_COST = 300;

    function createProductCard() {
        const card = document.createElement('div');
        card.className = 'product-card';

        const uniqueId = Date.now() + Math.random().toString(36).substr(2, 9);

        card.innerHTML = `
            <button type="button" class="remove-product" title="Удалить">&times;</button>
            
            <div class="product-row-top">
                <div class="input-group">
                    <label>Изделие</label>
                    <select class="selector product-type">
                        <option value="cake">Торт</option>
                        <option value="cupcake">Капкейк</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Размер / Кол-во</label>
                    <select class="selector product-size"></select>
                </div>

                <div class="input-group weight-group" style="display: none;">
                    <label>Точный вес (кг) *</label>
                    <input type="number" class="selector product-weight" min="1.5" max="5" step="0.5" value="1.5">
                </div>
            </div>

            <div class="product-row-bottom">
                <div class="input-group">
                    <label>Начинка</label>
                    <select class="selector product-filling">
                        <option value="vanilla">Ванильная клубника</option>
                        <option value="redvelvet">Красный бархат</option>
                        <option value="snickers">Сникерс</option>
                        <option value="blueberry">Черника</option>
                        <option value="oreo">Шоколадный (oreo)</option>
                        <option value="coconut">Кокос-сгущенка</option>
                        <option value="banana">Клубника-банан</option>
                        <option value="mango">Манго-маракуйя</option>
                    </select>
                </div>
            </div>

            <div class="product-row-design">
                <div class="input-group">
                    <label>Пожелания к дизайну (надпись, цвета, декор)</label>
                    <textarea class="selector product-design" rows="2" placeholder="Например: надпись 'С днём рождения, Аня!', розовый крем..."></textarea>
                </div>
                
                <div class="photo-upload-wrapper">
                    <label>Прикрепить фото дизайна (до 2 шт)</label>
                    <input type="file" class="photo-input" accept="image/*" style="display:none;" id="photo1-${uniqueId}">
                    <input type="file" class="photo-input" accept="image/*" style="display:none;" id="photo2-${uniqueId}">
                    <div class="photo-inputs">
                        <label for="photo1-${uniqueId}" class="photo-btn" id="btn-photo-${uniqueId}">+ Добавить фото</label>
                    </div>
                    <div class="photo-preview"></div>
                </div>
            </div>

            <div class="product-price">Стоимость: <span class="price-value">0</span> ₽</div>
        `;

        const typeSelect = card.querySelector('.product-type');
        const sizeSelect = card.querySelector('.product-size');
        const weightGroup = card.querySelector('.weight-group');
        const weightInput = card.querySelector('.product-weight');
        const priceValue = card.querySelector('.price-value');
        const removeBtn = card.querySelector('.remove-product');

        const fileInput1 = card.querySelector(`#photo1-${uniqueId}`);
        const fileInput2 = card.querySelector(`#photo2-${uniqueId}`);
        const photoBtn = card.querySelector(`#btn-photo-${uniqueId}`);
        const photoPreview = card.querySelector('.photo-preview');

        let uploadedCount = 0;

        // возня с фото
        function handleFile(e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const previewWrapper = document.createElement('div');
                previewWrapper.className = 'photo-preview-wrapper';

                const img = document.createElement('img');
                img.src = event.target.result;
                img.className = 'photo-thumb';
                previewWrapper.appendChild(img);

                const removeThumb = document.createElement('button');
                removeThumb.type = 'button';
                removeThumb.className = 'remove-thumb';
                removeThumb.innerHTML = '&times;';

                removeThumb.onclick = () => {
                    previewWrapper.remove();
                    uploadedCount--;
                    e.target.value = '';

                    if (uploadedCount < 2) {
                        photoBtn.style.display = 'inline-block';
                        if (!fileInput1.files.length) {
                            photoBtn.setAttribute('for', `photo1-${uniqueId}`);
                        } else if (!fileInput2.files.length) {
                            photoBtn.setAttribute('for', `photo2-${uniqueId}`);
                        }
                    }
                };
                previewWrapper.appendChild(removeThumb);
                photoPreview.appendChild(previewWrapper);

                uploadedCount++;

                if (uploadedCount >= 2) {
                    photoBtn.style.display = 'none';
                } else {
                    photoBtn.setAttribute('for', `photo2-${uniqueId}`);
                }
            };
            reader.readAsDataURL(file);
        }

        if (fileInput1) fileInput1.addEventListener('change', handleFile);
        if (fileInput2) fileInput2.addEventListener('change', handleFile);


        // выбор размеров
        function updateSizes() {
            sizeSelect.innerHTML = '';
            if (typeSelect.value === 'cake') {
                sizeSelect.innerHTML = `
                    <option value="s" data-price="1490">S (500 г) - 1490 ₽</option>
                    <option value="m" data-price="2180">M (1 кг) - 2180 ₽</option>
                    <option value="l" data-price="2100">L (1 кг) - 2100 ₽/кг</option>
                `;
            } else {
                sizeSelect.innerHTML = `
                    <option value="4" data-price="600">4 шт - 600 ₽</option>
                    <option value="6" data-price="850">6 шт - 850 ₽</option>
                    <option value="9" data-price="1250">9 шт - 1250 ₽</option>
                    <option value="12" data-price="1600">12 шт - 1600 ₽</option>
                `;
            }
            toggleWeightInput();
            updatePrice();
        }

        function toggleWeightInput() {
            if (typeSelect.value === 'cake' && sizeSelect.value === 'l') {
                weightGroup.style.display = 'flex';
            } else {
                weightGroup.style.display = 'none';
            }
        }


       // изменение цены
        function updatePrice() {
            const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
            if (!selectedOption) return;

            let price = parseInt(selectedOption.getAttribute('data-price')) || 0;

            if (typeSelect.value === 'cake' && sizeSelect.value === 'l') {
                const weight = parseFloat(weightInput.value) || 1.5;
                price = price * weight;
            }

            priceValue.textContent = Math.round(price);
            updateTotal();
        }

        typeSelect.addEventListener('change', updateSizes);
        sizeSelect.addEventListener('change', () => {
            toggleWeightInput();
            updatePrice();
        });
        weightInput.addEventListener('input', updatePrice);

        removeBtn.addEventListener('click', () => {
            card.remove();
            updateTotal();
        });

        updateSizes();
        return card;
    }

    // итоговая цена
    function updateTotal() {
        let total = 0;
        const prices = document.querySelectorAll('.price-value');

        prices.forEach(price => {
            total += parseInt(price.textContent) || 0;
        });

        const finalDelivery = total > 0 ? DELIVERY_COST : 0;

        if (deliveryPrice) deliveryPrice.textContent = `${finalDelivery} ₽`;
        if (totalPrice) totalPrice.textContent = `${total + finalDelivery} ₽`;
    }

    if (productsContainer) {
        productsContainer.appendChild(createProductCard());
        updateTotal();
    }

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            productsContainer.appendChild(createProductCard());
            updateTotal();
        });
    }

    const form = document.getElementById('orderForm');
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    const dateError = document.createElement('span');

    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            phoneInput.classList.remove('input-error');
            if (phoneError) phoneError.style.display = 'none';
        });
    }

    if (date) {
        dateError.className = 'error-text';
        dateError.style.display = 'none';
        dateError.textContent = 'Доставка доступна только на завтра и позже';
        date.parentNode.appendChild(dateError);

        date.addEventListener('change', () => {
            date.classList.remove('input-error');
            dateError.style.display = 'none';
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const requiredFields = [
                { id: 'name', name: 'Имя' },
                { id: 'phone', name: 'Телефон' },
                { id: 'address', name: 'Адрес' },
                { id: 'date', name: 'Дата' },
                { id: 'time', name: 'Время' }
            ];

            let firstEmptyField = null;

            for (const field of requiredFields) {
                const el = document.getElementById(field.id);
                if (el && !el.value.trim()) {
                    firstEmptyField = el;
                    break;
                }
            }

            if (firstEmptyField) {
                document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
                firstEmptyField.classList.add('input-error');
                firstEmptyField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstEmptyField.focus();
                return;
            }

            const name = document.getElementById('name').value.trim();
            const phone = phoneInput.value.trim();
            const address = document.getElementById('address').value.trim();
            const dateValue = document.getElementById('date').value;
            const timeValue = document.getElementById('time').value;

            const socialValue = document.getElementById('social') ? document.getElementById('social').value.trim() : '';

            phoneInput.classList.remove('input-error');
            if (phoneError) phoneError.style.display = 'none';

            if (dateValue < tomorrowString) {
                date.classList.add('input-error');
                dateError.style.display = 'block';
                date.scrollIntoView({ behavior: 'smooth', block: 'center' });
                date.focus();
                return;
            }

            const selectedDateTime = new Date(`${dateValue}T${timeValue}`);
            const now = new Date();

            if (selectedDateTime < now) {
                alert('Вы выбрали дату или время в прошлом. Пожалуйста, выберите актуальное время доставки.');
                return;
            }

            const phoneRegex = /^[\d\s\+\-\(\)]{10,20}$/;
            if (!phoneRegex.test(phone)) {
                phoneInput.classList.add('input-error');
                if (phoneError) {
                    phoneError.style.display = 'block';
                    phoneError.textContent = 'Введите корректный номер';
                }
                phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                phoneInput.focus();
                return;
            }

            const prices = document.querySelectorAll('.price-value');
            let hasProducts = false;
            prices.forEach(p => {
                if (parseInt(p.textContent) > 0) hasProducts = true;
            });

            if (!hasProducts) {
                alert('Пожалуйста, выберите хотя бы одно изделие для заказа!');
                return;
            }

            alert(`Спасибо, ${name}! Ваш заказ успешно оформлен.\n\nДетали доставки:\nДата: ${dateValue}\nВремя: ${timeValue}\nАдрес: ${address}\n\nС вами свяжется менеджер для подтверждения.`);
        });
    }
});