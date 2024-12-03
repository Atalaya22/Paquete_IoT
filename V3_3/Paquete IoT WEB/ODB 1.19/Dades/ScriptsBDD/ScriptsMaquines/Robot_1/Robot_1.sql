/****** Object:  Table [dbo].[Robot_1]    Script Date: 18/05/2020 12:49:19 ******/
CREATE TABLE [dbo].[Robot_1](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[Duracio] [time](7) NOT NULL,
	[Final] [datetime] NOT NULL,
	[EstatId] [tinyint] NOT NULL,
	[InfoId] [smallint] NOT NULL,
	[AlarmaId] [smallint] NOT NULL,
	[ProducteId] [nvarchar](50) NOT NULL,
	[ProductesTotals] [int] NOT NULL,
	[RebuigTotal] [int] NULL,
 CONSTRAINT [PK_Robot_1] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Temp_Robot_1]    Script Date: 18/05/2020 12:49:19 ******/
CREATE TABLE [dbo].[Temp_Robot_1](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[EstatId] [tinyint] NOT NULL,
	[InfoId] [smallint] NOT NULL,
	[AlarmaId] [smallint] NOT NULL,
	[ProducteId] [nvarchar](50) NOT NULL,
	[ProductesTotals] [int] NOT NULL,
	[RebuigTotal] [int] NULL,
 CONSTRAINT [PK_Temp_Robot_1] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Robot_1_Cadencies]    Script Date: 18/05/2020 12:49:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Robot_1_Cadencies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NULL,
	[Cadencia] [float] NULL,
 CONSTRAINT [PK_Robot_1_Cadencies] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_Robot_1_Productes]    Script Date: 18/05/2020 12:49:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Info_Robot_1_Productes](
	[Id] [int] NOT NULL,
	[Nom] [varchar](max) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[IdIntern] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Info_Robot_1_Productes] PRIMARY KEY CLUSTERED
(
	[IdIntern] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
