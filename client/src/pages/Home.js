import React from 'react';
import { useQuery } from '@apollo/client';

//Fix code to import all art posted
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_EVOKE } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_THOUGHTS);
    const evoke = data?.thoughts || [];

    return (
        <main>
            <div className="flex-row justify-center">
                <div 
                    className="col-12 col-md-10 mb-3 p-3" 
                    style={{ border: '1px solid #1a1a1a' }}
                >
                    <ThoughtForm />
                </div>
                <div className="col-12 col-md-8 mb-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <ThoughtList
                            thoughts={thoughts}
                            title="What feeling does this piece of art evoke?"
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;