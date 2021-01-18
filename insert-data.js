const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://jakpu:Midi@000@hyrefcluster.se4we.mongodb.net/providerDB?retryWrites=true&w=majority";
const client = new MongoClient(url,  { useUnifiedTopology: true });

// The database to use
const dbName = "providerDB";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection("providers");

        // Construct a document                                                                                                                                                              
        let providerDocument = {
            "provider_name": "Crystal Specialist Hospital",
            "category": "D",
            "coverage_type": "Medical",
            "phone": "09035701900",
            "location": { "addess": "148/150, Akowonjo Road, Dopemu, Agege", "city": "Agege", "state": "Lagos" },
            "email": "providerservices@crystalhospital.com",
            "specialist_clinic": [
                { "specialist_type": "Obstetrics & Gynaecology", "is_inhouse": false, "on_request": false, "clinic_days_time": ["Monday: 12pm", "Tuesday: 12pm", "Thursday: 12pm", "Friday: 12pm", "Saturday: 12pm"] },
                { "specialist_type": "Paediatrics", "is_inhouse": false, "on_request": false, "clinic_days_time": ["Monday: 2pm", "Wednesday: 2pm", "Friday: 2pm"] },
                { "specialist_type": "Ambulance Services", "is_inhouse": true, "on_request": true, "clinic_days_time": [] },
                { "specialist_type": "Cardiology", "is_inhouse": false, "on_request": false, "clinic_days_time": ["Monday: 8a.m-10a.m", "Wednesday: 8a.m-10a.m", "Friday: 8a.m-10a.m", "Saturday: 8a.m-10a.m"] },
                { "specialist_type": "Dermatology", "is_inhouse": false, "on_request": false, "clinic_days_time": ["Monday: 9a.m-4p.m", "Tuesday: 9a.m-4p.m", "Wednesday: 9a.m-4p.m", "Thursday: 9a.m-4p.m", "Friday: 9a.m-4p.m"] },
                { "specialist_type": "Ear, Nose & Throat (ENT)", "is_inhouse": false, "on_request": false, "clinic_days_time": ["Wednesday: 4p.m-6p.m"] },
                { "specialist_type": "Endocrinology", "is_inhouse": false, "on_request": false, "clinic_days_time": ["Monday: 8a.m-10a.m", "Wednesday: 8a.m-10a.m", "Thursday: 8a.m-10a.m", "Friday: 8a.m-10a.m"] },
                { "specialist_type": "Nephrology", "is_inhouse": false, "on_request": false, "clinic_days_time": ["Monday: 8a.m-10a.m", "Wednesday: 8a.m-10a.m", "Friday: 9a.m-4p.m", "Saturday: 8a.m-10a.m"] },
                { "specialist_type": "Physiotherapy", "is_inhouse": false, "on_request": false, "clinic_days_time": ["Monday: 9a.m-4p.m", "Tuesday: 9a.m-4p.m", "Wednesday: 9a.m-4p.m", "Thursday: 9a.m-4p.m", "Friday: 9a.m-4p.m", "Saturday: 9a.m-4p.m"] },
                { "specialist_type": "Urology", "is_inhouse": false, "on_request": false, "clinic_days_time": ["Monday: 8a.m-10a.m", "Wednesday: 8a.m-10a.m", "Friday: 9a.m-4p.m", "Saturday: 8a.m-10a.m"] }
            ]
        }

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(providerDocument);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

run().catch(console.dir);