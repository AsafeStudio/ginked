
import { CartItem } from '../types';

export const generateOrderEmail = (user: { username: string, email: string }, cart: CartItem[], total: number) => {
  const itemsHtml = cart.map(item => `
    <tr>
      <td width="80" style="padding: 15px 0; border-bottom: 1px solid #1a1a1a;">
        <img src="${item.image}" alt="${item.name}" width="70" style="display: block; border: 1px solid #333333;">
      </td>
      <td style="padding: 15px 15px; border-bottom: 1px solid #1a1a1a;">
        <p style="margin: 0; font-size: 14px; font-weight: bold; color: #ffffff; text-transform: uppercase;">${item.name}</p>
        <p style="margin: 5px 0 0 0; font-size: 11px; color: #666666; font-family: 'Courier New', Courier, monospace;">TAMANHO: ${item.size} | QTD: ${item.quantity.toString().padStart(2, '0')}</p>
      </td>
      <td align="right" style="padding: 15px 0; border-bottom: 1px solid #1a1a1a;">
        <p style="margin: 0; font-size: 14px; font-weight: bold; color: #ffffff; font-family: 'Courier New', Courier, monospace;">R$ ${(item.price * item.quantity).toFixed(2)}</p>
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head><meta charset="UTF-8"></head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: sans-serif; color: #ffffff;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0a0a0a; padding: 40px 0;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #000000; border: 1px solid #1a1a1a;">
              <tr>
                <td align="center" style="padding: 40px; border-bottom: 2px solid #ff0000;">
                  <h1 style="margin: 0; font-size: 32px; color: #ffffff; text-transform: uppercase;">GINKED</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px 0; color: #ffffff; text-transform: uppercase;">CARGA_AUTORIZADA</h2>
                  <p style="color: #a0a0a0;">Saudações ${user.username}. Seu pedido foi processado com sucesso.</p>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                    ${itemsHtml}
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                    <tr>
                      <td style="padding: 20px 0; border-top: 1px solid #1a1a1a;">
                        <p style="margin: 0; font-size: 18px; font-weight: 900; color: #ffffff;">TOTAL_DÉBITO</p>
                      </td>
                      <td align="right" style="padding: 20px 0; border-top: 1px solid #1a1a1a;">
                        <p style="margin: 0; font-size: 24px; font-weight: 900; color: #ff0000;">R$ ${total.toFixed(2)}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
