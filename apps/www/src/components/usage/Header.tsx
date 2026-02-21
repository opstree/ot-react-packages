import React from 'react';
import Header from '../docs/Header';
import { Button } from '@workspace/ui/components/ui/button';
import { Plus } from 'lucide-react';

const HeaderUsage = () => {
    return (
        <div className="w-full p-6 space-y-8 bg-neutral-100 dark:bg-neutral-900 rounded-lg min-h-[300px]">
            <div>
                <h3 className="text-lg font-semibold mb-4 text-center">Standard Header</h3>
                <Header
                    page="Dashboard"
                    subPage="Overview of your system performance"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4 text-center">Header with Action</h3>
                <Header
                    page="Users"
                    subPage="Manage your team members"
                    action={
                        <Button className="cursor-pointer">
                            <Plus className="w-4 h-4 mr-2" />
                            Invite User
                        </Button>
                    }
                />
            </div>
        </div>
    );
};

export default HeaderUsage;
