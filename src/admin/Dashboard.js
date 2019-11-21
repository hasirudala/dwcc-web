import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';


export default () => (
    <Card>
        <Title title="DWCC Admin Console" />
        <CardContent style={{ minHeight: '90vh' }}>
            <h1>Welcome to the administration area</h1>
            <p>
                In this section, you can...
                <ul>
                    <li>Authorize (staff) user accounts from Hasirudala organization to access this app</li>
                    <li>Add/update DWCC master data</li>
                    <li>Create/manage waste categories</li>
                    <li>etc.</li>
                </ul>
            </p>
        </CardContent>
    </Card>
);
