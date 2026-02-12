import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    keywords,
    image = '/og-image.png',
    url = 'https://hyperplott.com',
    type = 'website'
}) => {
    const siteTitle = 'Hyperplott';
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | AI-Powered Scientific Optimization`;
    const defaultDescription = 'Hyperplott is an AI-powered Design of Experiments (DoE) platform helping researchers, scientists, and students optimize experimental designs with statistical precision.';
    const finalDescription = description || defaultDescription;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={finalDescription} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Facebook / Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={image} />

            {/* Canonical Link */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;
