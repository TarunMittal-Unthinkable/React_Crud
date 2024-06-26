import sodium from 'libsodium-wrappers';

export const handleEncryptPassword = async (password) => {
    try {
      await sodium.ready;
      const passwordUint8Array = sodium.from_string(password);
      const publicKeyUint8Array = sodium.from_base64(import.meta.env.VITE_PASSWORD_DECRYPTION_PUBLIC_KEY, sodium.base64_variants.ORIGINAL);
      const privateKeyUint8Array = sodium.from_base64(import.meta.env.VITE_PASSWORD_DECRYPTION_PRIVATE_KEY, sodium.base64_variants.ORIGINAL);
      const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
      const encrypted = sodium.crypto_box_easy(passwordUint8Array, nonce, publicKeyUint8Array, privateKeyUint8Array);
      return {
        encryptedPassword: sodium.to_base64(encrypted, sodium.base64_variants.ORIGINAL),
        nonce: sodium.to_base64(nonce, sodium.base64_variants.ORIGINAL)
      };
    } catch (error) {
      console.error("Error encrypting password:", error);
    }
  };
  