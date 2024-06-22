document.addEventListener('DOMContentLoaded', () => {
    const desks = [];
    for (let i = 1; i <= 15; i++) {
        desks.push({
            id: i,
            type: i <= 10 ? 'individual' : 'team',
            booked: false
        });
    }

    const revenue = {
        basic: 0,
        premium: 0,
        executive: 0,
        team: 0
    };

    const deskListElement = document.getElementById('desk-list');
    const bookingForm = document.getElementById('booking-form');
    const bookingSummaryElement = document.getElementById('booking-summary');
    const dashboardElements = {
        basic: document.getElementById('basic-revenue'),
        premium: document.getElementById('premium-revenue'),
        executive: document.getElementById('executive-revenue'),
        team: document.getElementById('team-revenue')
    };

    function renderDesks() {
        deskListElement.innerHTML = '';
        desks.forEach(desk => {
            const deskElement = document.createElement('div');
            deskElement.className = `desk ${desk.type} ${desk.booked ? 'booked' : ''}`;
            deskElement.textContent = `${desk.type === 'individual' ? 'Individual Desk' : 'Team Desk'} #${desk.id}`;
            deskElement.dataset.id = desk.id;
            deskListElement.appendChild(deskElement);
        });
    }

    function updateDashboard() {
        dashboardElements.basic.textContent = revenue.basic.toFixed(2);
        dashboardElements.premium.textContent = revenue.premium.toFixed(2);
        dashboardElements.executive.textContent = revenue.executive.toFixed(2);
        dashboardElements.team.textContent = revenue.team.toFixed(2);
    }

    function calculateTotal({ memberType, duration, deskId }) {
        const rate = memberType === 'basic' ? 10 : memberType === 'premium' ? 15 : memberType === 'executive' ? 20 : 25;
        const discount = duration > 3 ? 0.9 : 1;
        const total = rate * duration * discount;
        revenue[memberType] += total;
        desks.find(desk => desk.id == deskId).booked = true;
        return total;
    }

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const deskId = parseInt(e.target.deskId.value);
        const memberType = e.target.memberType.value;
        const duration = parseInt(e.target.duration.value);

        if (desks.find(desk => desk.id === deskId).booked) {
            alert('Desk is already booked!');
            return;
        }

        const total = calculateTotal({ memberType, duration, deskId });
        bookingSummaryElement.innerHTML = `<h3>Booking Summary</h3><p>Desk #${deskId} booked for ${duration} hours. Total: $${total.toFixed(2)}</p>`;
        updateDashboard();
        renderDesks();
        bookingForm.reset();
    });

    renderDesks();
    updateDashboard();
});
