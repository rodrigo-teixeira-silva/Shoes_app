import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate (email: string){
    OneSignal.sendTags({
        'user_name':'Rodrigo',
        'user_email': 'rodrigo.teixeira@gmail.com'
    });
}

export function tagCardUpdate(itemConst: string){
    OneSignal.sendTag('cart_item_const', itemConst)
}