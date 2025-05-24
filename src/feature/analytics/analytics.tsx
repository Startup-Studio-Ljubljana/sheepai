import { createRoute } from '@tanstack/react-router'
import { Route } from '@/routes/__root'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { useEffect, useState } from 'react'
import data from '../../../bank_account_data.json'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF6699']

function Analytics() {
    const [chartData, setChartData] = useState<{ day: string; amount: number }[]>([])
    const [categoryData, setCategoryData] = useState<{ name: string; value: number; color: string }[]>([])
    const [suggestions, setSuggestions] = useState<string[]>([])

    useEffect(() => {
        const thisMonth = new Date().getMonth()
        const filtered = data.transactions.filter(t => new Date(t.date).getMonth() === thisMonth && t.amount < 0)

        const dailyMap: Record<string, number> = {}
        const categoryMap: Record<string, number> = {}

        filtered.forEach(tx => {
            const day = new Date(tx.date).getDate()
            dailyMap[day] = (dailyMap[day] || 0) + Math.abs(tx.amount)
            categoryMap[tx.category] = (categoryMap[tx.category] || 0) + Math.abs(tx.amount)
        })

        setChartData(Object.keys(dailyMap).map(day => ({ day, amount: dailyMap[day] })))

        setCategoryData(
            Object.keys(categoryMap).map((key, i) => ({
                name: key,
                value: categoryMap[key],
                color: COLORS[i % COLORS.length],
            }))
        )

        const savings = []
        if (categoryMap.subscriptions > 30) savings.push('Review your subscriptions — over 30€ spent this month.')
        if (categoryMap.restaurants > 100) savings.push('Consider reducing dining out — over 100€ this month.')
        if (categoryMap.coffee > 40) savings.push('Too much coffee? More than 40€ spent!')

        setSuggestions(savings)
    }, [])

    return (
        <div className="flex flex-col gap-4 p-4 md:grid md:grid-cols-3">
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Daily Spendings (This Month)</CardTitle>
                </CardHeader>
                <CardContent className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                </CardHeader>
                <CardContent className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="md:col-span-3">
                <CardHeader>
                    <CardTitle>Saving Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                        {suggestions.length > 0 ? suggestions.map((s, i) => <li key={i}>{s}</li>) : <li>No suggestions this month.</li>}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

export const analyticsRoute = createRoute({
    path: '/analytics',
    getParentRoute: () => Route,
    component: Analytics,
})
