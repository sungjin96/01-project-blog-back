import bcrypt from 'bcrypt';

export const setBcrypt = async ({ password }) => {
    return await bcrypt.hash(password, 10);
};

export const compareBcrypt = async ({ password, hash }) => {
    return await bcrypt.compare(password, hash);
};

export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};
