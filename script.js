document.addEventListener('DOMContentLoaded', () => {
    
    // Contact Data for vCard
    const contactData = {
        firstName: 'Vinita',
        lastName: 'K Hassija',
        title: 'Senior Lead - Community Relationship',
        company: 'The Economic Times Verticals, Times Internet Ltd.',
        phoneMobile: '+919820590053',
        phoneWork: '+912266353535',
        email: 'vinita.hassija@timesinternet.in',
        website1: 'https://b2b.economictimes.indiatimes.com/',
        website2: 'http://www.timesinternet.in',
        addressStreet: 'Times of India Bldg., Dr. D. N. Road, Opposite CST Station',
        addressCity: 'Mumbai',
        addressZip: '400001',
        addressCountry: 'India'
    };

    // Save Contact Function (Generates vCard)
    const saveContactBtn = document.getElementById('saveContactBtn');
    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', () => {
            const vcard = `BEGIN:VCARD
VERSION:3.0
N:${contactData.lastName};${contactData.firstName};;;
FN:${contactData.firstName} ${contactData.lastName}
ORG:${contactData.company}
TITLE:${contactData.title}
TEL;TYPE=CELL,VOICE:${contactData.phoneMobile}
TEL;TYPE=WORK,VOICE:${contactData.phoneWork}
EMAIL;TYPE=WORK,INTERNET:${contactData.email}
URL:${contactData.website1}
URL:${contactData.website2}
ADR;TYPE=WORK:;;${contactData.addressStreet};${contactData.addressCity};;;${contactData.addressZip};${contactData.addressCountry}
END:VCARD`;

            const blob = new Blob([vcard], { type: 'text/vcard' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${contactData.firstName}_${contactData.lastName}.vcf`;
            
            document.body.appendChild(a);
            a.click();
            
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });
    }

    // Share Contact Function (Web Share API)
    const shareCardBtn = document.getElementById('shareCardBtn');
    if (shareCardBtn) {
        shareCardBtn.addEventListener('click', async () => {
            const shareData = {
                title: `${contactData.firstName} ${contactData.lastName} - Digital Visiting Card`,
                text: `Contact card for ${contactData.firstName} ${contactData.lastName}, ${contactData.title} at ${contactData.company}.`,
                url: window.location.href, // This will be the actual URL when hosted
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    // Fallback to copying URL
                    navigator.clipboard.writeText(window.location.href)
                        .then(() => alert('Link copied to clipboard!'))
                        .catch(() => alert('Failed to share.'));
                }
            } catch (err) {
                console.log('Error sharing:', err);
            }
        });
    }
});
