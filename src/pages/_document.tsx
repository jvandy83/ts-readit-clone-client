import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600&display=swap'
						rel='stylesheet'
					/>
					<link
						rel='stylesheet'
						href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
						integrity='sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=='
						crossOrigin='anonymous'
						referrerPolicy='no-referrer'
					/>
					<link
						rel='stylesheet'
						href='https://i.icomoon.io/public/temp/1b1123d321/UntitledProject/style.css'
					/>
				</Head>
				<body className='font-body' style={{ backgroundColor: '#DAE0E6' }}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
export default MyDocument;
