function MyGoals() {
    const goals = [
        {
            id: '1',
            title: 'Dream Vacation',
            targetAmount: 3000,
            currentAmount: 2850,
            monthlyContribution: 200,
            icon: '✈️'
        },
        {
            id: '2',
            title: 'New Laptop',
            targetAmount: 1200,
            currentAmount: 450,
            monthlyContribution: 150,
            icon: '💻'
        },
        {
            id: '3',
            title: 'New Car',
            targetAmount: 25000,
            currentAmount: 8500,
            monthlyContribution: 500,
            icon: '🚗'
        }
    ];

    return (
        <div className="mb-6 px-4">
            <Notification title="Reach your goals faster" description="You can use OTP funds to reach your goals faster."/>

            <h1 className="text-xl font-semibold w-full text-white mb-4 mt-8 mx-2">My Goals</h1>

            <div className="pb-24 space-y-4">
                {goals.map((goal) => <GoalCard key={goal.id} {...goal} />)}
            </div>
        </div>
    );
}

export default MyGoals;
