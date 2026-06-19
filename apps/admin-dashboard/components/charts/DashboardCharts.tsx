"use client";

import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const COLORS = ['#E8620A', '#1A1208', '#796556', '#D97706', '#16A34A', '#2563EB'];
const PIE_COLORS = ['#E8620A', '#F7F0E4', '#1A1208', '#796556'];

export function QuestionTrendChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="date" tick={{fontSize: 12, fill: '#796556'}} tickLine={false} axisLine={false} />
        <YAxis tick={{fontSize: 12, fill: '#796556'}} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
        <Line type="monotone" dataKey="questions" stroke="#E8620A" strokeWidth={3} dot={{ r: 4, fill: '#E8620A' }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DistrictDistributionChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 40 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
        <XAxis type="number" tick={{fontSize: 12, fill: '#796556'}} tickLine={false} axisLine={false} />
        <YAxis dataKey="district" type="category" tick={{fontSize: 12, fill: '#1A1208'}} tickLine={false} axisLine={false} width={100} />
        <Tooltip cursor={{fill: '#F7F0E4'}} contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
        <Bar dataKey="questions" fill="#1A1208" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index === 0 ? '#E8620A' : '#1A1208'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DepartmentDistributionChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" stroke="none">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
        <Legend wrapperStyle={{ fontSize: '12px', color: '#1A1208' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function LanguageDistributionChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" stroke="none">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
        <Legend wrapperStyle={{ fontSize: '12px', color: '#1A1208' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function QuestionStatusChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={100} fill="#8884d8" paddingAngle={2} dataKey="value" stroke="none">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
        <Legend wrapperStyle={{ fontSize: '12px', color: '#1A1208' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function AiProcessingTimeChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="date" tick={{fontSize: 12, fill: '#796556'}} tickLine={false} axisLine={false} />
        <YAxis tick={{fontSize: 12, fill: '#796556'}} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
        <Line type="monotone" dataKey="timeMs" stroke="#1A1208" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#E8620A' }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function WeeklyTrendsChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <defs>
          <linearGradient id="colorQuestions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1A1208" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#1A1208" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E8620A" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#E8620A" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="week" tick={{fontSize: 12, fill: '#796556'}} tickLine={false} axisLine={false} />
        <YAxis tick={{fontSize: 12, fill: '#796556'}} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
        <Area type="monotone" dataKey="questions" stroke="#1A1208" fillOpacity={1} fill="url(#colorQuestions)" />
        <Area type="monotone" dataKey="processed" stroke="#E8620A" strokeWidth={2} fillOpacity={1} fill="url(#colorProcessed)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
