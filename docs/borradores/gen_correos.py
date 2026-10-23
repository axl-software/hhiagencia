import json,sys
def ent(s): return ''.join(c if ord(c)<128 else '&#%d;'%ord(c) for c in s)
P='margin:0 0 22px;font-size:18px;line-height:1.7;color:#2b3350;'
H1='margin:0 0 24px;font-size:28px;line-height:1.3;color:#0b1020;'
B='https://www.hhiagencia.cl'
def casco(cuerpo):
    # cuerpo: html (string con comillas simples ya escapadas para JS al final)
    return ('<div style="background:#eef2f8;padding:32px 12px;font-family:Arial,Helvetica,sans-serif;">'
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;">'
    '<tr><td style="padding:40px 40px 14px;"><img src="'+B+'/brand/hh-logo-azul.png" alt="HHA Digital Solutions SpA" width="150" style="display:block;height:auto;border:0;"></td></tr>'
    '<tr><td style="height:5px;background:#d7263d;font-size:0;line-height:0;">&nbsp;</td></tr>'
    '<tr><td style="padding:36px 40px 14px;color:#0b1020;">'+cuerpo+'</td></tr>'
    '<tr><td style="padding:24px 40px 44px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>'
    '<td style="padding-right:14px;"><img src="'+B+'/img/equipo/herberth-garay.jpg" alt="Herberth Garay" width="72" height="72" style="display:block;border-radius:50%;border:0;"></td>'
    '<td style="padding-right:36px;font-size:16px;line-height:1.5;color:#2b3350;"><strong style="color:#0b1020;">Herberth Garay</strong><br>HHA Digital Solutions SpA</td>'
    '<td style="padding-right:14px;"><img src="'+B+'/img/equipo/alexander-bello.jpg" alt="Alexander Bello" width="72" height="72" style="display:block;border-radius:50%;border:0;"></td>'
    '<td style="font-size:16px;line-height:1.5;color:#2b3350;"><strong style="color:#0b1020;">Alexander Bello</strong><br>HHA Digital Solutions SpA</td>'
    '</tr></table></td></tr></table></div>')
# --- prueba gratis (nombre -> marcador @@NOMBRE@@)
cuerpo_prueba=('<h1 style="'+H1+'">Hola @@NOMBRE@@,</h1>'
 '<p style="'+P+'"><strong>Gracias por contactarnos.</strong></p>'
 '<p style="'+P+'">Recibimos tu solicitud de prueba gratis de HHA Systems. Vamos a preparar tu sistema de reservas y ventas con el tipo de negocio que nos indicaste.</p>'
 '<p style="'+P+'">En menos de 48 horas te escribimos con el enlace para que la uses durante 7 días. <strong>Primero la pruebas; si te sirve, te quedas.</strong></p>')
# --- cotizacion
cuerpo_cot=('<h1 style="'+H1+'">Hola @@NOMBRE@@,</h1>'
 '<p style="'+P+'"><strong>Gracias por contactarnos.</strong></p>'
 '<p style="'+P+'">Recibimos tu solicitud de cotización@@SOBRE@@</p>@@LISTA@@'
 '<p style="'+P+'">Nuestro equipo se comunicará contigo @@CANAL@@ dentro de las próximas 24 horas para conversar los detalles de tu proyecto.</p>')
def js_str(s): return "'"+ent(s).replace("\\","\\\\").replace("'","\'")+"'"
ESC="const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/[^\x00-\x7F]/g, (c) => '&#' + c.charCodeAt(0) + ';');"
def expr_prueba():
    h=casco(cuerpo_prueba).split('@@NOMBRE@@')
    return "={{ (() => { "+ESC+" const nombre = esc($('Solicitud desde la web').item.json.body.nombre); return "+js_str(h[0])+" + nombre + "+js_str(h[1])+"; })() }}"
def expr_cot():
    h=casco(cuerpo_cot)
    a,rest=h.split('@@NOMBRE@@'); b,rest=rest.split('@@SOBRE@@'); c,rest=rest.split('@@LISTA@@'); d,e=rest.split('@@CANAL@@')
    lista="const lista = sv.length ? '<ul style=\"margin:0 0 22px;padding-left:24px;font-size:18px;line-height:1.7;color:#2b3350;\">' + sv.map((s) => '<li style=\"margin:0 0 8px;\">' + s + '</li>').join('') + '</ul>' : '';"
    return ("={{ (() => { const b = $('Solicitud desde la web').item.json.body; "+ESC+" const nombre = esc(b.nombre); const sv = (Array.isArray(b.servicios) ? b.servicios : []).map(esc); "+lista+" const canal = b.contactar_por === 'whatsapp' ? 'por WhatsApp' : 'por correo'; return "
      +js_str(a)+" + nombre + "+js_str(b)+" + (sv.length ? ' sobre:' : '.') + "+js_str(c)+" + lista + "+js_str(d)+" + canal + "+js_str(e)+"; })() }}")
# vistas previas
def ejemplo(cuerpo,**k):
    for a,v in k.items(): cuerpo=cuerpo.replace('@@'+a+'@@',v)
    return '<!doctype html><meta charset="utf-8"><title>Correo (borrador)</title>'+casco(cuerpo)
lista_ej='<ul style="margin:0 0 22px;padding-left:24px;font-size:18px;line-height:1.7;color:#2b3350;"><li style="margin:0 0 8px;">Desarrollo web · Web Business</li><li style="margin:0 0 8px;">Marketing digital</li></ul>'
open('correo-prueba-gratis-v4.html','w',encoding='utf-8').write(ejemplo(cuerpo_prueba,NOMBRE='Catalina'))
open('correo-cotizacion-v2.html','w',encoding='utf-8').write(ejemplo(cuerpo_cot,NOMBRE='Catalina',SOBRE=' sobre:',LISTA=lista_ej,CANAL='por WhatsApp'))
json.dump({'prueba':expr_prueba(),'cot':expr_cot()},open('exprs.json','w'),ensure_ascii=True)
print(len(expr_prueba()),len(expr_cot()))
