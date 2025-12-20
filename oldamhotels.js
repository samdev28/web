   // Initialize date pickers
        const today = new Date();
        today.setHours(0,0,0,0);
        const todayString = today.toISOString().split('T')[0];
        
        document.getElementById('arrival').setAttribute('min', todayString);
        document.getElementById('departure').setAttribute('min', todayString);

        // Set default dates
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];
        
        document.getElementById('arrival').value = todayString;
        document.getElementById('departure').value = tomorrowString;

        let selectedRoom = {};

        function handleBookingSearch(event) {
            event.preventDefault();
            const arrival = document.getElementById('arrival').value;
            const departure = document.getElementById('departure').value;
            const guests = document.getElementById('guests').value;
            const rooms = document.getElementById('rooms').value;

            alert(`🔍 Searching for ${rooms} room(s) for ${guests} guest(s)\nArrival: ${arrival}\nDeparture: ${departure}\n\nCheck our rooms section below!`);
            
            document.getElementById('rooms').scrollIntoView({behavior: 'smooth'});
        }

        function calculateNights() {
            const arrival = new Date(document.getElementById('arrival').value);
            const departure = new Date(document.getElementById('departure').value);
            const nights = Math.max(1, Math.floor((departure - arrival) / (1000 * 60 * 60 * 24)));
            return nights;
        }

        function openReservationModal(roomName, price, maxGuests) {
            selectedRoom = { name: roomName, price: price, maxGuests: maxGuests };
            document.getElementById('modalRoomName').textContent = roomName;
            
            const nights = calculateNights();
            const taxRate = 0.15;
            const taxes = price * nights * taxRate;
            const total = (price * nights) + taxes;

            document.getElementById('nightly').textContent = '$' + price.toFixed(2);
            document.getElementById('nightCount').textContent = nights;
            document.getElementById('taxes').textContent = '$' + taxes.toFixed(2);
            document.getElementById('totalPrice').textContent = '$' + total.toFixed(2);
            
            document.getElementById('reservationModal').style.display = 'block';
        }

        function closeReservationModal() {
            document.getElementById('reservationModal').style.display = 'none';
        }

        function completeReservation(event) {
            event.preventDefault();
            const name = document.getElementById('guestName').value;
            const email = document.getElementById('guestEmail').value;
            const phone = document.getElementById('guestPhone').value;
            const requests = document.getElementById('specialRequests').value;
            const nights = calculateNights();
            const totalPrice = document.getElementById('totalPrice').textContent;

            alert(`✅ Reservation Confirmed!\n\nRoom: ${selectedRoom.name}\nGuest: ${name}\nEmail: ${email}\nPhone: ${phone}\nNights: ${nights}\nTotal: ${totalPrice}\n\nA confirmation email will be sent shortly. Thank you for choosing Oldam Hotels!`);
            
            closeReservationModal();
            
            // Reset form
            document.getElementById('guestName').value = '';
            document.getElementById('guestEmail').value = '';
            document.getElementById('guestPhone').value = '';
            document.getElementById('specialRequests').value = '';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('reservationModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({behavior: 'smooth'});
                }
            });
        });