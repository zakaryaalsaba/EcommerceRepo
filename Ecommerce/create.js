const DoorDashClient = require('@doordash/sdk')

const accessKey = process.env.DOOR_DASH_ACCESS_KEY
const developerId = process.env.DD_DEVELOPER_ID
const SigningSecret = process.env.SIGNING_SECRET

const client = new DoorDashClient.DoorDashClient(
    {
        "developer_id": "4f25ce09-28ae-4eb1-a673-f0282f4ea7a3",
        "key_id": "a4e7300a-ce3a-49c8-8f61-d54f1c882204",
        "signing_secret": "wG_RukN6jKs4bdd02wwPFzeCf5Kp5BrKA-8Uii1Gfjg"
    }
)

const response = client.createDelivery({
    external_delivery_id: 'D-14145',
    pickup_address: '1000 4th Ave, Seattle, WA, 98104',
    pickup_phone_number: '+1(650)5555555',
    dropoff_address: '1201 3rd Ave, Seattle, WA, 98101',
    dropoff_phone_number: '+1(650)5555555',
}).then(response => {
    console.log(response.data)
}).catch(err => {
    console.log(err)
})