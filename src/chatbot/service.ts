import axios from 'axios';
import { ServiceConfig, ContactItem, MprofielAdminResult, ChatbotMessage } from './types';
import { authenticatedOAuth2 } from '../auth';

export =  (config: ServiceConfig) => async (chatmessage: ChatbotMessage) =>
    {
        return new Promise<object>(async(resolve, reject) => {
            const response = await axios.post('https://chatbotsapi-app1-o.antwerpen.be/api/v1/chats/5a01c4874c3749000b763c13/message?access_token=eaiWopkE64KaJomnCB2LzLglZcRDcCsucWRiIKSioe11f0r82ZdrtNc1MteK31ZI',
                {
                    environment: 'production',
                    session: chatmessage.session_id,
                    message: chatmessage.message
                }
            );
            resolve(response.data);
        });
    }
